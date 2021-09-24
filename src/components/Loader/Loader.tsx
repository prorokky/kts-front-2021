import LoaderStyles from './Loader.module.scss'

const Loader = () => {
    // eslint-disable-next-line no-console
    console.warn(LoaderStyles)
    return (
        <div className={LoaderStyles['lds-dual-ring']}></div>
    )
}

export default Loader