const SMTPServer = require("smtp-server").SMTPServer;
const simpleParser = require('mailparser').simpleParser;
const bizConfig = require('./configuration/business');
const EmailFacade = require('./business/email');

//SMTP Server
const server = new SMTPServer({
    name: "EC-SMTP-Server",
    secure: false,
    authOptional: true,
    onConnect(session, callback) {
        if (session.remoteAddress === bizConfig.smtp.host) {
            console.log(`Server is connected to ${bizConfig.smtp.host}:${bizConfig.smtp.port}`);
        }

        return callback(); // Accept the connection
    },
    onAuth(auth, session, callback) {
        if (auth.username !== bizConfig.smtp.authentication.username || auth.password !== bizConfig.smtp.authentication.password) {
            console.log('Validate Auth failed, Invalid username or password.')
            return callback(new Error("Invalid username or password"));
        }
        callback(null, {user: 1}); // where 123 is the user id or similar property
    },
    onData(stream, session, callback) {
        simpleParser(stream, {}).then(parsed => {
            // console.log(`Parsed is :: ${parsed.text}`);
            const emailRequest = {
                from:parsed.from.text,
                to:parsed.to.text,
                cc:parsed.cc.text,
                subject:parsed.subject,
                text:parsed.text
            }
            
            EmailFacade.sendEmail(emailRequest);

        }).catch(err => {
            console.log(`Get stream data error :: ${err}`);
        });
        stream.on("end", () => {
            console.log('Read stream end');
        });

    },
    onClose(session) {
        console.log('Server connection closed.')
    }
});

const smtpPort = process.env.SMTP_PORT | bizConfig.smtp.port;
server.listen(smtpPort, bizConfig.smtp.host, () => {
    console.log(`Server is listening on ${bizConfig.smtp.host}:${smtpPort}`);
});

server.on("error", err => {
    console.log("SMTP Server error %s", err.message);
});