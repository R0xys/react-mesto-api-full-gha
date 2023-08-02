export const InfoTooltip = ({ caption, icon, alt, onClose, isOpen }) => {
  return (
    <section className={`popup ${isOpen && "popup_opened"}`} id="tooltip-popup">
      <div className="popup__container">
        <button onClick={onClose} className="popup__close-button zero-button" id="tooltip-popup-close-button" type="button"></button>
          <img src={icon} alt={alt} className="popup__tooltip-icon"/>
          <p className="popup__tooltip-caption">{caption}</p>
      </div>
  </section>
  )
}