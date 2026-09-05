import HomeController from './HomeController'
import Api from './Api'
import UserManagement from './UserManagement'
import ProductController from './ProductController'
import ProjectController from './ProjectController'
import TechTalkController from './TechTalkController'
import ExperienceController from './ExperienceController'
import StatController from './StatController'
import AboutController from './AboutController'
import PortFolioInformation from './PortFolioInformation'
import AboutInformationController from './AboutInformationController'
import Settings from './Settings'

const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
    Api: Object.assign(Api, Api),
    UserManagement: Object.assign(UserManagement, UserManagement),
    ProductController: Object.assign(ProductController, ProductController),
    ProjectController: Object.assign(ProjectController, ProjectController),
    TechTalkController: Object.assign(TechTalkController, TechTalkController),
    ExperienceController: Object.assign(ExperienceController, ExperienceController),
    StatController: Object.assign(StatController, StatController),
    AboutController: Object.assign(AboutController, AboutController),
    PortFolioInformation: Object.assign(PortFolioInformation, PortFolioInformation),
    AboutInformationController: Object.assign(AboutInformationController, AboutInformationController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers