type SubmitPropsType = {
  title: string;
};

const SubmitButton: React.FC<SubmitPropsType> = ({ title }) => {
  return (
    <button type="submit" className="button-primary">
      {title}
    </button>
  );
};

export default SubmitButton;
