import homeLogo from '../../../../assets/icons/home.svg';
import settingsLogo from '../../../../assets/icons/settings.svg';
import foldersLogo from '../../../../assets/icons/folders.svg';

const NavigationBar = () => {
  return (
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
      <img src={homeLogo} alt="home logo" width="40" height="40" />
      <img src={settingsLogo} alt="settings logo" width="35" height="35" />
      <img src={foldersLogo} alt="folders logo" width="40" height="40" />
    </div>
  );
};

export default NavigationBar;
