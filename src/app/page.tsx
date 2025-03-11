import Image from "next/image";
/* import PageList from '../components/PaginatedList/index'
import Codility from '../components/AutoSuggestion/index'
import SampleToast from '../components/Toast/index' */

import PictureTiles from '../components/PinInterestDeck/index';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <PictureTiles />
      {/* <Codility /> */}
      {/* <SampleToast /> */}
    </div>
  );
}
