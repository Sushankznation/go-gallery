import React from "react"
import Card from "./Card"
import Masonry from 'react-masonry-css'

import "./Cardgrid.css"

const breakpointColumnsObj = {
    default: 5, // default number of columns
    1920: 4, // number of columns when screen width is 1920px or larger
    1200: 3, // number of columns when screen width is 1200px or larger
    900: 2, // number of columns when screen width is 900px or larger
    600: 1 // number of columns when screen width is 600px or larger
}

const Cardgrid = React.forwardRef((props, ref) => { // Defining a component called Cardgrid that is a forwardRef component (so that the parent component can pass a ref to this component)
        return (
            <main>
                <Masonry
                    breakpointCols={breakpointColumnsObj} // Sets the number of columns based on the screen width
                    className="masonry-grid" // Class name for the grid container
                    columnClassName="masonry-grid_column" // Class name for each grid item
                >
                    {props.data.map((item, index) => {
                        if (props.data.length === index + 6) { // If this is the 5th to last item in the list
                            return (
                                <div key={item.id} ref={ref}> 
                                {/* // Attach the ref to this element so that it can be scrolled to */}
                                    <Card {...item} /> 
                                    {/* // Render a Card component with the item's data passed as props */}
                                </div>
                            )
                        }
                        return (
                            <div key={item.id}>
                                <Card {...item} />
                            </div>
                        )
                    })}
                </Masonry>
            </main>
        )
    }
)

export default React.memo(Cardgrid) // Exporting the Cardgrid component as a memoized component to improve performance by avoiding unnecessary re-renders.
