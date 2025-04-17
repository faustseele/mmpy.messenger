export const signUpData = {
  headingData: [
    {
      text: "Регистрация",
    }
  ],
  inputData: [
    {
      id: "first_name",
      type: "text",
      label: "Имя",
    },
    {
      id: "second_name",
      type: "text",
      label: "Фамилия",
    },
    {
      id: "login",
      type: "text",
      label: "Логин",
    },
    {
      id: "email",
      type: "email",
      label: "Эл. почта",
    },
    {
      id: "password",
      type: "password",
      label: "Пароль",
    },
    {
      id: "phone",
      type: "tel",
      label: "Номер телефона",
    }
  ],
  buttonData: [
    {
      modifier: "button",
      type: "submit",
      label: "Зарегистрироваться ✓",
      link: "/chats"
    }
  ]
}

export const signInData = {
  headingData: [
    {
      text: "Вход 🚪",
    },
  ],
  inputData: [
    {
      id: "login",
      type: "text",
      label: "Логин",
    },
    {
      id: "password",
      type: "password",
      label: "Пароль",
    }
  ],
  buttonData: [
    {
      type: "button",
      label: "Впервые?",
      isSilent: true,
      link: "/sign-up"
    },
    {
      type: "submit",
      label: "Авторизоваться ✓",
      link: "/chats"
    }
  ]
}