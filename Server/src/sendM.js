const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    tls: {
        rejectUnauthorized: false,
    },
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// function sendLetter(info){
//     const mailOptions={
//         from:{
//             name:"training",
//             address:process.env.EMAIL_ADDRESS,
//         },
//         to:process.env.EMAIL_ADDRESS,
//         subject:`${info.name} ${info.lastname} wrote you a latter`,
//         html: `
//     <div>
//     <p><h3>Full Name:</h3>  ${info.name} ${info.lastname}</p>
//     <p><h3>Phone:</h3>    ${info.phone}</p>
//     <p><h3>Email:</h3>    ${info.email}</p>
//     <p><h3>Message:</h3>  ${info.message}</p>
//     </div>
//     `,
//     };
//     return transporter.sendMail(mailOptions);
// };

function checkEmail(token) {
    const mailOptions = {
        from: {
            name: "Verification Email",
            address: process.env.EMAIL_ADDRESS,
        },
        to: process.env.EMAIL_ADDRESS,
        subject: `xndrum enq hastatel dzer emaily`,
        html: `
            <div>
           <a href=http://localhost:3000/verification/${token}>click</a>
            </div>
            `,
    };
    return transporter.sendMail(mailOptions);
}


module.exports = checkEmail;
