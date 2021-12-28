const SearchForm = ({ value, setValue }) => {
  const changeHandler = (event) => {
    event.preventDefault()

    setValue(event.target.value)
  }

  const submitHandler = (event) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={submitHandler}>
      Find countries: <input onChange={changeHandler} />
    </form>
  )
}

export default SearchForm
