import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PostContext } from '../../contexts/PostContext'
import { useContext } from 'react'

const ActionButtons = ({ url, id }) => {
	const { deletePost, findPost, setShowUpdatePostModal } = useContext(
		PostContext
	)

	const choosePost = postId => {
		findPost(postId)
		setShowUpdatePostModal(true)
	}

	return (
		<>
			<Button className='post-button' href={url} target='_blank'>
				<img src={playIcon} alt='play' width='28' height='28' />
			</Button>
			<Button className='post-button' onClick={choosePost.bind(this, id)}>
				<img src={editIcon} alt='edit' width='20' height='20' />
			</Button>
			<Button className='post-button' onClick={deletePost.bind(this, id)}>
				<img src={deleteIcon} alt='delete' width='20' height='20' />
			</Button>
		</>
	)
}

export default ActionButtons
