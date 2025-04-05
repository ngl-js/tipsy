import { useContext, useState } from 'react';
import { Rating } from 'react-simple-star-rating'
// Context
import { MediaContext } from '../context/MediaContext';

const RatingStars = () => {

  const { setmyRating } = useContext(MediaContext)
  const [star, setStar] = useState(0)
  const [check, setCheck] = useState(false)

  // Catch Rating value
  const handleRating = (rate) => {
    setmyRating(star)
  }
  // Optinal callback functions
  const onPointerMove = (value) => {
    setStar(value)
  }
  // Catch Rating value
  const handleCheck = () => {
    if (check) {
      setStar(() => {
        setmyRating(0)
        return 0
      })
    }
    else {
      setStar(() => {
        setmyRating(1)
        return 1
      })
    }

    setCheck(prev => !prev)
  }

  return (
    <div className="row mb-5 pb-md-4 align-items-center">

      <div className="col-12 col-lg-10 flex justify-center">
        <h1 className="text-center text-2x text-orange-500">
          ¿Agregar calificación?

          <div
            className="inline-flex items-center px-3">
            <label
              onClick={handleCheck}
              className="flex items-center cursor-pointer relative">

              <input
                type="checkbox" value={check}
                className="peer h-5 w-5 cursor-pointer transition-all 
                appearance-none rounded shadow hover:shadow-md border 
                border-orange-400 checked:bg-slate-800 checked:border-slate-800"
                id="check" />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth={1}>
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            </label>
          </div>

        </h1>
      </div>

      <div className="col-12 col-lg-10 flex justify-center">
        <Rating
          initialValue={star}
          readonly={!check}
          onPointerLeave={handleRating}
          onPointerMove={onPointerMove}
        /* Available Props */
        />
      </div>

    </div>
  );
}

export default RatingStars;
