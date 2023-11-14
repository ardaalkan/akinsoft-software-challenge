import ListingCard from "../ListingCard/ListingCard";

const ListingList = ({ userListings, onListingDelete }) => (
  <div>
    {userListings.map((listing, index) => (
      <ListingCard key={index} data={listing} onDeleteClick={onListingDelete} />
    ))}
  </div>
);

export default ListingList;
