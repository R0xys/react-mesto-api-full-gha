import { InfoTooltip } from "./InfoTooltip";
import success from "../images/success.svg";

export const SuccessInfoTooltip = (props) => {
  return (
    <InfoTooltip caption="Вы успешно зарегистрировались!" icon={success} alt="Успешная регистрация" onClose={props.onClose} isOpen={props.isOpen} />
  )
}