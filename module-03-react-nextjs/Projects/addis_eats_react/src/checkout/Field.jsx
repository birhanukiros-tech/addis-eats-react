function Field({ label, name, type = "text", value, onChange, placeholder}) {
    return (
        <div className="form-field">
            <label htmlFor={name}>{label}</label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}/>
        </div>
    );
}

export default Field;