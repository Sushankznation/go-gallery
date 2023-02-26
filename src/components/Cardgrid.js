import React from "react"
import Card from "./Card"
import Masonry from 'react-masonry-css'

import "./Cardgrid.css"

const breakpointColumnsObj = {
    default: 5,
    1920: 4,
    1200: 3,
    900: 2,
    600: 1
}

const Cardgrid = React.forwardRef((props, ref) => {
        return (
            <main>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {props.data.map((item, index) => {
                        if (props.data.length === index + 6) { //5th to last
                            return (
                                <div key={item.id} ref={ref}>
                                    <Card {...item} />
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

export default React.memo(Cardgrid)
