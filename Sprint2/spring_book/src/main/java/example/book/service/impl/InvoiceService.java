package example.book.service.impl;

import example.book.config.MailConfig;
import example.book.model.AppUser;
import example.book.model.Invoice;
import example.book.repository.IInvoiceRepository;
import example.book.service.IInvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;


@Service
public class InvoiceService implements IInvoiceService {

    @Autowired
    private IInvoiceRepository iInvoiceRepository;

    @Override
    public void saveAll(Invoice invoices) {
        iInvoiceRepository.save(invoices);
    }

    @Override
    public Page<Invoice> findAllByInvoice(Pageable pageable) {
        return iInvoiceRepository.findAllByInvoice(pageable);
    }

    @Override
    public void updateStatusToPaid(Long invoiceId) {
        iInvoiceRepository.updateStatusToPaid(invoiceId);

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.host", MailConfig.HOST_NAME);
        props.put("mail.smtp.socketFactory.port", MailConfig.SSL_PORT);
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.port", MailConfig.SSL_PORT);

        Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(MailConfig.APP_EMAIL, MailConfig.APP_PASSWORD);
            }
        });
        Invoice invoice = findByIdInvoice(invoiceId);
        Message message = new MimeMessage(session);
        try {
            message.setFrom(new InternetAddress(MailConfig.APP_EMAIL));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(invoice.getAppUser().getEmail()));
            message.setSubject("Thông báo đơn hàng của bạn đang được giao.");

            Multipart multipart = new MimeMultipart();
            MimeBodyPart textBodyPart = new MimeBodyPart();
            String htmlContent = "<body style=\"margin: 0 10px;font-family: system-ui;\n" +
                    "    font-weight: 500;\">\n" +
                    "<div style=\"width: 100%;height: 800px;background-color: indianred;display: flex;align-items: center;\">\n" +
                    "  <div style=\"width: 700px;height: 700px;margin: 0 auto;background-color: white;display: flex;\n" +
                    "  align-items: center;border-radius: 5px\">\n" +
                    "    <div style=\"width: 500px;margin: 20px auto;border-radius: 5px;\">\n" +
                    "      <h3>Kính gửi quý khách!</h3>\n" +
                    "      <p>Đơn hàng của bạn đã được xác nhận và đang được vận chuyển đến tay bạn trong vài ngày tới.\n" +
                    "        .Vui lòng chú ý số điện thoại để bên nhân viên chúng tôi liên lạc.\n" +
                    "        Kiểm tra kỹ hàng hóa trước khi nhận hàng!</p>\n" +
                    "      <img style=\"width: 500px;height: 200px;\" src=\"https://modiaz.com/upload/2020/08/tam-anh-huong-cua-phim-tu-gioi-thieu-doanh-nghiep-trong-truyen-thong-noi-bo-xay-dung-van-hoa-doanh-nghiep.jpg\" alt=\"\">\n" +
                    "\n" +
                    "      <p>Trân trọng!</p>\n" +
                    "      <h4 style=\"color: red\">Nhà Sách HomeBook</h4>\n" +
                    "      <p>Thư này được gửi tự động từ địa chỉ của hệ thống.Vui lòng không phản hồi!</p>\n" +
                    "      <p>Mail suport: <span style=\"color: #1943c2\">hombook@gmail.com</span></p>\n" +
                    "      <p>Hotmail: <span style=\"color: #1943c2\">0344848457</span></p>\n" +
                    "      <p>Website:<a style=\"color: #1943c2\" href=\" homebook.com\" style=\"color: #e3274c\">\n" +
                    "       homebook.com\n" +
                    "      </a></p>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "</div>\n" +
                    "</body>";
            textBodyPart.setContent(htmlContent, "text/html;charset=UTF-8");

            multipart.addBodyPart(textBodyPart);

            message.setContent(multipart);

            Transport.send(message);
            System.out.println("sending");
        } catch (MessagingException ex) {
            ex.printStackTrace();
            System.out.println("send Errors!!!!!!");
        }
    }


    @Override
    public Page<Invoice> findAllByAppUser_Username(String username, Pageable pageable) {
        return iInvoiceRepository.findAllByAppUser_Username(username,pageable);
    }

    @Override
    public Double calculateTotalProfit() {
        return iInvoiceRepository.calculateTotalProfit();
    }

    @Override
    public Integer getTotalQuantity() {
        return iInvoiceRepository.getTotalQuantity();
    }

    @Override
    public Invoice findByIdInvoice(Long idInvoice) {
        return iInvoiceRepository.findByIdInvoice(idInvoice);
    }


}