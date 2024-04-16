// // @flow
// import { t, Trans } from '@lingui/macro';
// import { I18n } from '@lingui/react';
// import * as React from 'react';
// import Dialog from '../UI/Dialog.js';
// import FlatButton from '../UI/FlatButton.js';
// import HelpButton from '../UI/HelpButton/index.js';
// import { Tabs } from '../UI/Tabs.js';
// import { AssetStore, type AssetStoreInterface } from './index.js';
// import { type ResourceManagementProps } from '../ResourcesList/ResourceSource.js';
// import { sendAssetAddedToProject } from '../Utils/Analytics/EventSender.js';
// import PreferencesContext from '../MainFrame/Preferences/PreferencesContext.js';
// import RaisedButton from '../UI/RaisedButton.js';
// import { AssetStoreContext } from './AssetStoreContext.js';
// import AssetPackInstallDialog from './AssetPackInstallDialog.js';
// import { type EnumeratedObjectMetadata } from '../ObjectsList/EnumerateObjects.js';
// import {
//   installRequiredExtensions,
//   installPublicAsset,
//   checkRequiredExtensionsUpdate,
//   checkRequiredExtensionsUpdateForAssets,
// } from './InstallAsset.js';
// import {
//   type Asset,
//   type AssetShortHeader,
//   getPublicAsset,
//   isPrivateAsset,
// } from '../Utils/GDevelopServices/Asset.js';
// import { type ExtensionShortHeader } from '../Utils/GDevelopServices/Extension.js';
// import EventsFunctionsExtensionsContext from '../EventsFunctionsExtensionsLoader/EventsFunctionsExtensionsContext.js';
// import Window from '../Utils/Window.js';
// import PrivateAssetsAuthorizationContext from './PrivateAssets/PrivateAssetsAuthorizationContext.js';
// import useAlertDialog from '../UI/Alert/useAlertDialog.js';
// import { useResponsiveWindowSize } from '../UI/Responsive/ResponsiveWindowMeasurer.js';
// import { enumerateAssetStoreIds } from './EnumerateAssetStoreIds.js';
// import PromisePool from '@supercharge/promise-pool';
// import NewObjectFromScratch from './NewObjectFromScratch.js';
// import { getAssetShortHeadersToDisplay } from './AssetsList.js';
// import ErrorBoundary from '../UI/ErrorBoundary.js';
// import NFTCard from '../MainFrame/EditorContainers/HomePage/BuildSection/NFTCard.jsx';
// import { NFTContext } from '../context/NFTContext.js';
// import { useState, useEffect } from 'react';

// const isDev = Window.isDev();

// export const useExtensionUpdateAlertDialog = () => {
//   // Function remains unchanged
// };

// export const useFetchAssets = () => {
//   // Function remains unchanged
// };

// type Props = {|
//   project: gdProject,
//   layout: ?gdLayout,
//   objectsContainer: gdObjectsContainer,
//   resourceManagementProps: ResourceManagementProps,
//   onClose: () => void,
//   onCreateNewObject: (type: string) => void,
//   onObjectsAddedFromAssets: (Array<gdObject>) => void,
//   canInstallPrivateAsset: () => boolean,
// |};

// function NewObjectDialog({
//   project,
//   layout,
//   objectsContainer,
//   resourceManagementProps,
//   onClose,
//   onCreateNewObject,
//   onObjectsAddedFromAssets,
//   canInstallPrivateAsset,
// }: Props) {
//   const { isMobile } = useResponsiveWindowSize();
//   const { fetchNFTs, fetchMyNFTs } = React.useContext(NFTContext);
//   const [nfts, setNfts] = useState([]);
//   const [myNFTs, setMyNFTs] = useState([]);
//   const [fetchMyNFTsClicked, setFetchMyNFTsClicked] = useState(false);
//   const [fetchMyNFTsError, setFetchMyNFTsError] = useState(null);

//   const handleFetchMyNFTs = async () => {
//     try {
//       const fetchedMyNFTs = await fetchMyNFTs();
//       setMyNFTs(fetchedMyNFTs);
//       setFetchMyNFTsClicked(true);
//     } catch (error) {
//       console.error('Error fetching my NFTs:', error);
//       setFetchMyNFTsError(error.message);
//     }
//   };

//   useEffect(() => {
//     if (fetchMyNFTsClicked) {
//       const fetchNFTData = async () => {
//         try {
//           const fetchedNFTs = await fetchNFTs();
//           setNfts(fetchedNFTs);
//         } catch (error) {
//           console.error('Error fetching NFTs:', error);
//         }
//       };
//       fetchNFTData();
//     }
//   }, [fetchMyNFTsClicked, fetchNFTs]);

//   const { setNewObjectDialogDefaultTab, getNewObjectDialogDefaultTab } = React.useContext(PreferencesContext);
//   const [currentTab, setCurrentTab] = React.useState(getNewObjectDialogDefaultTab() || 'asset-store');

//   React.useEffect(() => setNewObjectDialogDefaultTab(currentTab), [
//     setNewObjectDialogDefaultTab,
//     currentTab,
//   ]);

//   const mainAction =
//     currentTab === 'asset-store' ? (
//       // Main action for asset store tab
//     ) : currentTab === 'fetch-nft' ? (
//       // No specific main action needed for fetch-nft tab
//       null
//     ) : (
//       // Main action for other tabs
//     );

//   return (
//     <I18n>
//       {({ i18n }) => (
//         <>
//           <Dialog
//             title={<Trans>New object</Trans>}
//             secondaryActions={[
//               <HelpButton helpPagePath="/objects" key="help" />,
//             ]}
//             actions={[
//               <FlatButton
//                 key="close"
//                 label={<Trans>Close</Trans>}
//                 primary={false}
//                 onClick={onClose}
//                 id="close-button"
//               />,
//               <FlatButton
//                 key="fetch-nft"
//                 primary
//                 label={<Trans>Fetch NFTs</Trans>}
//                 onClick={() => handleFetchMyNFTs()}
//               />,
//               <FlatButton
//                 key="fetch-mynfts"
//                 primary
//                 label={<Trans>Fetch My NFTs</Trans>}
//                 onClick={() => handleFetchMyNFTs()}
//               />,
//               mainAction,
//             ]}
//             onRequestClose={onClose}
//             onApply={null}
//             open
//             flexBody
//             fullHeight
//             id="new-object-dialog"
//             fixedContent={
//               <Tabs
//                 value={currentTab}
//                 onChange={setCurrentTab}
//                 options={[
//                   {
//                     label: <Trans>Asset Store</Trans>,
//                     value: 'asset-store',
//                     id: 'asset-store-tab',
//                   },
//                   {
//                     label: <Trans>New object from scratch</Trans>,
//                     value: 'new-object',
//                     id: 'new-object-from-scratch-tab',
//                   },
//                   {
//                     label: <Trans>Nft Card</Trans>,
//                     value: 'fetch-nft',
//                     id: 'nft-from-nft-tab',
//                   }
//                 ]}
//                 // Enforce scroll on mobile, because the tabs have long names.
//                 variant={isMobile ? 'scrollable' : undefined}
//               />
//             }
//           >
//             {currentTab === 'asset-store' && (
//               <AssetStore />
//             )}
//             {currentTab === 'new-object' && (
//               <NewObjectFromScratch
//                 onCreateNewObject={onCreateNewObject}
//                 onCustomObjectSelected={setSelectedCustomObjectEnumeratedMetadata}
//                 selectedCustomObject={selectedCustomObjectEnumeratedMetadata}
//                 onInstallAsset={onInstallAsset}
//                 isAssetBeingInstalled={isAssetBeingInstalled}
//                 project={project}
//                 i18n={i18n}
//               />
//             )}
            // {currentTab === 'fetch-nft' && (
            //   <div>
            //     {fetchMyNFTsClicked ? (
            //       myNFTs.map(nft => (
            //         <NFTCard key={nft.tokenId} nft={nft} />
            //       ))
            //     ) : null}
            //   </div>
            )}
//           </Dialog>
//         </>
//       )}
//     </I18n>
//   );
// }



           /* {currentTab === 'fetch-nft' && (
              <div>
                {nfts.map(nft => (
                  <NFTCard key={nft.tokenId} nft={nft} />
                ))}
              </div>
            )} */ 

// export default NewObjectDialog;
