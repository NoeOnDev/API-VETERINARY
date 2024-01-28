export function getVerificationEmailHTML(token) {
    return `
        <h1>Bienvenido a nuestro sitio web</h1>
        <p>Por favor, haz clic en el enlace de abajo para verificar tu correo electrónico:</p>
        <a href="http://127.0.0.1:9020/verify-email?token=${token}" style="background-color: blue; color: white; text-decoration: none; padding: 10px 20px;">Verificar correo electrónico</a>
    `;
}