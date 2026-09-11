function ErrorState( {message }) {
    return(
        <div>
            <h2>Something went wrong</h2>
            <p>{message}</p>
        </div>
    );
}
export default ErrorState;