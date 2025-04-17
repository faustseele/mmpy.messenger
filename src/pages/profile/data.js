export const profileData = {
  headingData: [
    {
      text: "⮘ Назад",
      isClickable: true,
    },
    {
      text: "Профиль",
    },
  ],
  profileData: {
    name: "Vanya",
  },
  inputEditorData: [
    {
      id: "email",
      type: "email",
      label: "Эл. почта",
      placeholder: "pochta@yandex.ru"
    },
    {
      id: "first_name",
      type: "text",
      label: "Имя",
      placeholder: "Иван"
    },
    {
      id: "second_name",
      type: "text",
      label: "Фамилия",
      placeholder: "Иванов"
    },
    {
      id: "login",
      type: "text",
      label: "Логин",
      placeholder: "ivanov"
    },
    {
      id: "display_name",
      type: "text",
      label: "Имя в чате",
      placeholder: "Vanya"
    },
    {
      id: "phone",
      type: "tel",
      label: "Номер телефона",
      placeholder: "8905551234"
    },
  ],
  buttonData: [
    {
      type: "button",
      label: "Изменить данные"
    },
    {
      type: "button",
      label: "Изменить пароль"
    },
    {
      type: "button",
      label: "Выйти",
      isSilent: true
    },

  ]

}