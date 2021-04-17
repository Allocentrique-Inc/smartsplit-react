import useForm from '../../../_/form/useForm';
import X from '../../../../icons/x';
import AddOrEditWorkpieceModal from '../addOrEditWorkpieceModal/addOrEditWorkpieceModal';

export default function AddWorkpieceMobile(props) {
  const { translations, language, setShowWorkpieceForm } = props;

  return (
    <div className="addWorkpieceMobile">
      <AddOrEditWorkpieceModal
        {...props}
        setShowModal={() => setShowWorkpieceForm(false)}
      />
    </div>
  );
}
