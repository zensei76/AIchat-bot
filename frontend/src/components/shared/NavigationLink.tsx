import { Link } from "react-router-dom";

type Props = {
  border: string ;
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};
const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={props.onClick}
      className={`nav-link `} 
      to={props.to}
      style={{ background: props.bg, color: props.textColor,  borderRadius: "0" , border : props.border }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
