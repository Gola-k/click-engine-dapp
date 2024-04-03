import { useContext } from 'react';
import { NFTContext } from '../../../../context/NFTContext';
import { Link } from '@material-ui/core';
import './NFTCard.css';

const shortenAddress = address =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

const NFTCard = ({ nft, onProfilePage }) => {
  const { nftCurrency } = useContext(NFTContext);
  const external_urls = 'https://gateway.pinata.cloud/';

  return (
    <Link
      href={{ pathname: '../nft-details.js', query: nft }}
      style={{ textDecoration: 'none' }}
    >
      {/* <Link to={`../nft-details`} className="nft-card-link"> */}
      <div className="nft-card">
        <div className="image-container">
          <img
            src={external_urls + nft.image}
            className="image"
            alt={`nft${nft.i}`}
          />
        </div>
        <div className="details">
          <p className="name">{nft.name}</p>
          <div className="price-address">
            <p className="price">
              {nft.price} <span className="currency">{nftCurrency}</span>
            </p>
            <p className="address">
              {shortenAddress(onProfilePage ? nft.owner : nft.seller)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
