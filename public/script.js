console.log("hello");
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
  console.log(buttonChangeStatus);
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");
  console.log(path);
  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", (e) => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      console.log(statusCurrent, id);
      let statusChange = statusCurrent == "off" ? "on" : "off";
      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      console.log(action);
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}
