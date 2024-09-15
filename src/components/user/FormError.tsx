const FormError: React.FC<{ text: string }> = ({ text }) => {
  return <p className="text-red-500 text-center">{text}</p>;
};

export default FormError;
