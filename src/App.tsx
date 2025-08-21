import { createRef, useState, type ChangeEvent } from 'react'
import icon from './assets/icon.png'
import SearchContainer from './components/SearchContainer'
import type { Album } from './@types/album'
import AlbumListContainer from './components/AlbumListContainer'
import SizeSlider from './components/SizeSlider'
import CoverPreviewContainer from './components/CoverPreviewContainer'
import ITunesApiClient from './util/api/itunesApiClient'
import DeezerApiClient from './util/api/deezerApiClient'
import { getDeezerArtworkUrl, getITunesArtworkUrl } from './util/url/urlParser'
import type { FixedSizeList } from 'react-window'
import { Card, Switch, Typography } from '@mui/material'
import './App.css'

const album: Album = {
  id: 1767673630,
  name: 'Watch the Fire',
  artistName: 'Boys Like Girls',
  thumbnailSrc: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c0/4b/01/c04b0132-0f23-2a9a-88f4-c22d996470e9/067003846363.png/60x60bb.jpg"
};

const album2: Album = {
  id: 276649794,
  name: 'Boys Like Girls',
  artistName: 'Boys Like Girls',
  thumbnailSrc: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/04/5a/e4/045ae4df-461d-db63-9b6f-cb48507c682d/mzi.ddfuhxng.jpg/60x60bb.jpg"
}

const album3: Album = {
  id: 580265083,
  name: 'Crazy World',
  artistName: 'Boys Like Girls',
  thumbnailSrc: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/d9/bd/65/d9bd655f-7de6-30a1-c1dc-9db071e9879d/886443665224.jpg/60x60bb.jpg"
}

function App() {
  const [list, setList] = useState([album, album2, album3]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album>(album);
  const [imageSize, setImageSize] = useState(1000);
  const [useExperimentalDeezer, setUseExperimentalDeezer] = useState(false);

  const onToggle = (_event: ChangeEvent, checked: boolean) => {
    setUseExperimentalDeezer(checked);
  };

  const listRef = createRef<FixedSizeList>();

  const doSearch = async (query: string) => {
    const results = useExperimentalDeezer ? await DeezerApiClient.searchAlbums(query) : await ITunesApiClient.searchAlbums(query);
    setList(results);

    // Scroll to top after setting new search results
    listRef.current?.scrollToItem(0);
  };

  const updateSelected = (selectedId: number) => {
    const selection = list.find((a) => a.id == selectedId)!;
    setSelectedAlbum(selection);
  };

  const getPreviewPaneArtwork = () => {
    if (!selectedAlbum.thumbnailSrc) return "";
    return useExperimentalDeezer ? getDeezerArtworkUrl(selectedAlbum.thumbnailSrc, 600, 100)
      : getITunesArtworkUrl(selectedAlbum.thumbnailSrc, 600);
  };

  const getRequestedSizeArtwork = () => {
    if (!selectedAlbum.thumbnailSrc) return "";
    return useExperimentalDeezer ? getDeezerArtworkUrl(selectedAlbum.thumbnailSrc, imageSize, 100)
      : getITunesArtworkUrl(selectedAlbum.thumbnailSrc, imageSize);
  };

  return (
    <>
      <img src={icon} className="logo" alt="App logo" />
      <Typography fontSize={32} marginBottom={4}>
        Coverart Finder
      </Typography>
      <Switch value={useExperimentalDeezer} onChange={onToggle} />
      <Card sx={{ display: 'flex', gap:'50px', padding: '50px 50px 50px 30px'}}>
        <div id="finder-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <SearchContainer doSearch={(input: string) => void doSearch(input)} />
          <AlbumListContainer albumList={list} listRef={listRef} selectedAlbumId={selectedAlbum.id} onSelect={(id) => updateSelected(id)} />
          <SizeSlider selectedSize={imageSize} setSelectedSize={setImageSize} />
        </div>
        <CoverPreviewContainer selectedSize={imageSize} previewSrc={getPreviewPaneArtwork()} downloadSrc={getRequestedSizeArtwork()} />
      </Card>
    </>
  )
}

export default App;
