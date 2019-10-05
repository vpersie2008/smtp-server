const HttpProxy = require("../common/httpProxy");
const emailService = new HttpProxy("EmailService");

class EmailFacade {

    sendEmail(request) {
        emailService
            .GET('Send')
            .then(data => {
                console.log(data);
                //res.json({success: true, msg: "获取数据成功"});
            })
            .catch(err => {
                //res.json({success: false, msg: `获取数据失败 ${err}`})
            });
    }
}

module.exports = new EmailFacade();