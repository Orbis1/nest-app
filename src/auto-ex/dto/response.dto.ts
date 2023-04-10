interface AutoExResponseSuccess {
  status: 'success';
  login?: string;
  password?: string;
  message: string;
  metaData?: {
    [prop: string]: string;
  };
}

interface AutoExResponseError {
  status: 'error';
  login?: string;
  password?: string;
  message: string;
  metaData: {
    errorMessage: string;
    [prop: string]: string;
  };
}

export type AutoExResponse = AutoExResponseSuccess | AutoExResponseError;

/*
{
 ⁣ ⁣ ⁣ ⁣"status": "success|error", //статус выполнения запроса
 ⁣ ⁣ ⁣ ⁣"login": "test", // Необязательное поле, в котором система может вернуть нам информацию о логине заведенного пользователя
 ⁣ ⁣ ⁣ ⁣"password": "password", // Необязательное поле, в котором система может вернуть нам информацию о пароле заведенного пользователя
 ⁣ ⁣ ⁣ ⁣"message": "Текст сообщения", // сообщение об ошибки которое необходимо отправить пользователю. Например, описание ошибки, которая произошла при выполнение заявки или инструкция как входа в систему
 ⁣ ⁣ ⁣ ⁣"metaData": {
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣"errorMessage": "" //Есле status = error, поле обязательно. Техническая информация об произошедшей ошибки при обработке заявке
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣//Люба другая информация которая система хочет сохранить в технических данных связанных с заявкой
 ⁣ ⁣ ⁣ ⁣} //Не обязательное свойство
}

*/
