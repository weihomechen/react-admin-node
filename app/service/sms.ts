import * as SMSClient from '@alicloud/sms-sdk';
import { Service } from 'egg';
import { smsConfig } from '../../config/config.private';

// 初始化sms_client demo: https://www.npmjs.com/package/@alicloud/sms-sdk?spm=a2c4g.11186623.2.15.638c3c1d0QeEeU
const smsClient = new SMSClient(smsConfig);
const SignName = 'ifun';
const TemplateCode = 'SMS_147436702';

export default class SMSService extends Service {
  public async send(phone: string): Promise<boolean> {
    const { ctx } = this;
    const code = String(Math.ceil(Math.random() * 1000000));

    // 发送短信
    const success = await smsClient.sendSMS({
      PhoneNumbers: phone, // 必填:待发送手机号。支持以逗号分隔的形式进行批量调用
      SignName, // 必填:短信签名-可在短信控制台中找到
      TemplateCode, // 必填:短信模板-可在短信控制台中找到，发送国际/港澳台消息时，请使用国际/港澳台短信模版
      TemplateParam: `{"code":${code}}`, // 可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时。
    }).then((res) => {
      const { Code } = res;
      if (Code === 'OK') {
        // 处理返回参数
        ctx.session.userVerifyCode = code;
        return true;
      }
    }, (err) => {
      ctx.logger.error(err);
      return false;
    });

    return success;
  }
}
