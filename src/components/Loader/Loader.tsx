import LoaderStyles from './Loader.module.scss'

const Loader = () => {
    return (
        <div className={LoaderStyles['lds-dual-ring']}></div>
    )
}

export default Loader