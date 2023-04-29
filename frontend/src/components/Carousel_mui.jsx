import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

const Carousel_mui = () => {

    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            img: "https://img.freepik.com/free-vector/happy-people-buying-clothes-online-t-shirt-percent-customer-flat-vector-illustration-e-commerce-digital-technology-concept-website-design-landing-web-page_74855-8344.jpg"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            img: "https://store.magenest.com/wp/wp-content/uploads/2020/09/images.jpg"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI1ZLQt3vrb23KywYM_zamNNO2dHRwzOAWmA&usqp=CAU"
        }
    ]

    return (
        <Carousel>
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}

function Item(props) {
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
            <img src={props.item.img} width={1600} height={500} alt="" />
            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}




export default Carousel_mui