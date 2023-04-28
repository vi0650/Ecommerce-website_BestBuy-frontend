import React from 'react'

function NavUp() {
  return (
    <>
    {/* <section className='head'>
        <div className='container d_flex'>
            <div>
                <label className='first'> +91 88299 88734 </label> 
                <label className='second'> Are You Seller? LogIn</label>
            </div>
        </div>
    </section> */}

      <section className='head'>
        <div className='container d_flex'>
          <div className='left row'>
            <span><i className='fa fa-phone'></i>
            <label> +88012 3456 7894</label></span>
          </div>
          <div className='right row RText'>
            <label> Are You Seller? LogIn</label>
          </div>
        </div>
      </section>

    </>
  )
}

export default NavUp;