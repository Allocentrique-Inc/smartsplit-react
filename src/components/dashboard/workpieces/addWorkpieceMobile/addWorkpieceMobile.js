import useForm from '../../../_/form/useForm';
import X from '../../../../icons/x';
import AddOrEditWorkpieceModal from '../../_/addOrEditWorkpieceModal/addOrEditWorkpieceModal';

export default function AddWorkpieceMobile(props) {
  const { translations, language, setShowAddWorkpiece } = props;

  return (
    <div className="addWorkpieceMobile">
      <AddOrEditWorkpieceModal
        {...props}
        setShowModal={() => setShowAddWorkpiece(false)}
      />
    </div>
  );
}
