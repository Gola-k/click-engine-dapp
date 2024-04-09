import { useContext } from 'react';
import { NFTContext } from '../../context/NFTContext';

const useNFTServiceHook = async () => {
  const { fetchNFTs } = useContext(NFTContext);
  const nfts = await fetchNFTs();
  return nfts;
  // Add other functions related to NFT service here
};

export default useNFTServiceHook;
