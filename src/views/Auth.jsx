import LoginForm from '../components/auth/LoginForm'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Navigate  } from 'react-router-dom'

const Auth = () => {
	const {authState: {user}} = useContext(AuthContext);
	if (user?.username) 
		return <Navigate  to='/dashboard' />
	else
		return (
			<div className='landing'>
				<div className='dark-overlay'>
					<div className='landing-inner'>
						<h1>Health Tracking</h1>
						<h4>Tracking of what are you doing!</h4>
						<LoginForm />
					</div>
				</div>
			</div>
		)
}

export default Auth
