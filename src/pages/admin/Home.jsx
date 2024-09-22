import { FiDelete } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import { openFilterMenu, closeFilterMenu } from "../../redux/uiSlice";
import { useDispatch, useSelector } from 'react-redux';
import JobViewsByTypeChart from './charts/JobViewsByTypeChart';
import JobPostingsByCompanyChart from './charts/JobPostingsByCompanyChart';
import JobApplicationsByTypeChart from './charts/JobApplicationsByTypeChart';
import UserRegistrationsOverTimeChart from './charts/UserRegistrationsOverTimeChart';
import JobSeekerPostsByExperienceLevelChart from './charts/JobSeekerPostsByExperienceLevelChart';
import JobViewsOverTimeChart from './charts/JobViewsOverTimeChart';

const Home = () => {
    const dispatch = useDispatch();
    const isFilterMenuOpen = useSelector((state) => state.ui.isFilterMenuOpen);
  
    const handleCloseFilterMenu = (e) => {
      if (e.target.classList.contains("filter-modal")) {
        dispatch(closeFilterMenu());
      }
    };
  
return(
<div>
<div className="grid md:grid-cols-3 gap-x-14">
        <div className="md:col-span-1 row-start-3 md:row-start-auto h-fit md:sticky top-0">
          <div
            className={`filter-modal ${isFilterMenuOpen ? "open" : ""}`}
            onClick={handleCloseFilterMenu}
          >
            <div className={`filter-dialog ${isFilterMenuOpen ? "open" : ""}`}>
              <div className="flex-center-between border-b dark:border-slate-800 md:hidden">
                <div
                  className="icon-box md:hidden"
                  onClick={() => dispatch(closeFilterMenu())}
                >
                  <FiDelete />
                </div>
              </div>
              {/* Replacing Filters with FilterSidebar */}
            
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="md:col-span-2 mt-5 md:mt-0 h-fit md:sticky top-0">
          <div
            className="flex-align-center gap-4"
            onClick={() => dispatch(openFilterMenu())}
          >
            <div className="md:hidden icon-box bg-white dark:bg-dark-card card-shadow dark:shadow-none card-bordered !rounded-md">
              <BiFilterAlt />
            </div>
          </div>
          
          <div className="p-6 space-y-10">
  {/* Grid for Three Charts */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <JobViewsByTypeChart />
    </div>
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <JobPostingsByCompanyChart />
    </div>
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <JobApplicationsByTypeChart />
    </div>
  </div>

  {/* Grid for Two Charts */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <UserRegistrationsOverTimeChart />
    </div>
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <JobSeekerPostsByExperienceLevelChart />
    </div>
  </div>
</div>

        
        </div>
      </div>
</div>
)
}

export default Home