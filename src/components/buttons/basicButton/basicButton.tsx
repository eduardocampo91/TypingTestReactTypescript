interface ButtonProps {
  onHandleCilck: () => void;
  label?: string;
  disabled?: boolean
}

const BasicButton: React.FC<ButtonProps> = ({ onHandleCilck, label, disabled }) => {
  return (
    <button onClick={onHandleCilck} className="btn btn-outline-primary" disabled={disabled}>
      {label}
    </button>
  );
};

export default BasicButton;
