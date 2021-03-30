const {EMAIL_FROM, BASE_URL} = require('../config')

module.exports = function(data) {
    return {
        to: data.email,
        from: EMAIL_FROM,
        subject: `Ця вкусняшка скоро буде у тебе ${data.userName}`, 
        html: `
        <h1> Привіт ${data.userName} ! Цей лист від Олега, розробника сайту ${BASE_URL} </h1>
        <p> Ви щойно зробили замовлення і вказали цю електронну пошту: ${data.email} тож сюди і пишу 😉  </p>
        <p> Такі вкусняшки Тобі привеземо: ${data.products}</p>
        <p> Круто правда ?</p>
        <p>Ця красота, їде  в ${data.city} вул. ${data.street} буд. ${data.house} ${data.entrance} ${data.flat}</p>
        
        <p> Замовлено в ${data.date} </p>
        <p>Вартість замовлення ${data.totalPrice} грн.</p>
        <p>Наш контактний телефон: 0679587995</p>
        <p> Ви не проти, якщо ми матимемо якісь питання то передзвонимо ${data.tel}  ? </p>
        <i> Смачного !</i>
        <hr/>
        <a href="${BASE_URL}">to Oleg's website </a>
        `
    }
}