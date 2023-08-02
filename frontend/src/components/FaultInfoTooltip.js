import { InfoTooltip } from "./InfoTooltip";
import fault from "../images/fault.svg"

export const FaultInfoTooltip = (props) => {
  return (
    <InfoTooltip caption="Что-то пошло не так! Попробуйте ещё раз." icon={fault} alt="Произошла ошибка" onClose={props.onClose} isOpen={props.isOpen}/>
  )
}