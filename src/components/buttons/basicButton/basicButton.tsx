interface ButtonProps {
  onHandleCilck: () => void;
  label?: string;
}

const BasicButton: React.FC<ButtonProps> = ({ onHandleCilck, label }) => {
  return (
    <button onClick={onHandleCilck} className="btn btn-outline-primary">
      {label}
    </button>
  );
};

export default BasicButton;
