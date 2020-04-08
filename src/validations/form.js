import React from 'react';

export const RenderField = field => {
    const {
        error,
        label,
        form,
        name,
        ...otherProps
    } = field;

    const classNames = `${error ? 'has-error' : ''}`;

    return (
        <div className="field">
            <label>{label}</label>
            <input name={name} className={classNames} ref={form}  { ...otherProps } />
            {error && <div className="form__error">{error.message}</div>}
        </div>
    )
};
