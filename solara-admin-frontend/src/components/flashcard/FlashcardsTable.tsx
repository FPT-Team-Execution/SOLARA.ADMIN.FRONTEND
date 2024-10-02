
interface IProps {
    collectionId: string
}

const FlashcardsTable = (props: IProps) => {
  return (
    <div>
        {props.collectionId}
    </div>
  )
}

export default FlashcardsTable
