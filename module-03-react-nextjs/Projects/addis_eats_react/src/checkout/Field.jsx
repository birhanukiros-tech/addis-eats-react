function Field({ lable, name, type = "text", value, onChange, placholder}) {
    return(
        <div className="form-field">
            <label htmlFor={name}>{lable}</label>
            <input 
            type={type}
            name={name} value={value}
            onChange={onChange}  placeholder={placholder}/>
        </div>
    );
} 
export default Field;
