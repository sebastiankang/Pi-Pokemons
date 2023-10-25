import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";

const Card = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // navega a la página detail teniendo en cuenta su ID
    navigate(`/detail/${props.id}`);
  };

  return (
    <div onClick={handleClick} className={styles.card}>
      <p>Name: {props.name} </p>
      <img src={props.image} alt={`${props.name}`} />
      <p>Type/s: {props.types?.map((t) => t.name + " ")} </p>
    </div>
  );
};

export default Card;
