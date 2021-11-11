import PlaceItem from "./PlaceItem";
import './PlaceList.css'

const PlaceList = props =>{
    return(
        <ul className='place-list'>
            {props.items.map( place=> 
            <PlaceItem 
                key={place._id} 
                id={place._id} 
                image={place.image} 
                title={place.title} 
                description={place.description} 
                address={place.address} 
                creatorId={place.creator} 
                coordinates={place.location} 
            />)}
        </ul>
    );
}

export default PlaceList;