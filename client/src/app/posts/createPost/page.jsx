'use client';

import { useState, useContext } from "react";
import Select from 'react-select';
import {UserContext} from '../../layout';
import { postFetch } from '@/Components/ServerFunctions';
import { useRouter } from 'next/navigation';
import { FaRegCreditCard } from "react-icons/fa";
import { MdOutlineTitle } from "react-icons/md";
import { LuSubtitles } from "react-icons/lu";
import Navbar from "@/Components/Navbar";

const CreatePost = () => {
    const router = useRouter();
    const {userName} = useContext(UserContext);
    const [form, setForm] = useState({ title: "", text: "", userName: userName, date: "", desiredSkills: [], creditWorth: 0 });
    const handleForm = (field, value) => setForm((prev) => { return { ...prev, [field]: value } });
    const [selectedOptions, setSelectedOptions] = useState([]);
    
    const options = [
        { value: 'gardening', label: 'Gardening' },
        { value: 'lawn_mowing', label: 'Lawn-Mowing' },
        { value: 'tutoring', label: 'Tutoring' },
        { value: 'web_development', label: 'Web-Development' },
        { value: 'graphic_design', label: 'Graphic-Design' },
        { value: 'digital_marketing', label: 'Digital-Marketing' },
        { value: 'data_analysis', label: 'Data-Analysis' },
        { value: 'network_administration', label: 'Network-Administration' },
        { value: 'cybersecurity', label: 'Cybersecurity' },
        { value: 'cloud_computing', label: 'Cloud-Computing' },
        { value: 'software_development', label: 'Software-Development' },
        { value: 'mobile_app_development', label: 'Mobile-App-Development' },
        { value: 'it_support', label: 'IT-Support' },
        { value: 'social_media_management', label: 'Social-Media-Management' },
        { value: 'seo_optimization', label: 'SEO-Optimization' },
        { value: 'video_editing', label: 'Video-Editing' },
        { value: 'database_management', label: 'Database-Management' },
        { value: 'ux_ui_design', label: 'UX/UI-Design' },
        { value: 'project_management', label: 'Project-Management' },
        { value: 'machine_learning', label: 'Machine-Learning' },
        { value: 'artificial_intelligence', label: 'Artificial-Intelligence' },
        { value: 'blockchain_technology', label: 'Blockchain-Technology' },
        { value: '3d_modeling', label: '3D-Modeling' },
        { value: 'cad_design', label: 'CAD-Design' },
        { value: 'digital_photography', label: 'Digital-Photography' },
        { value: 'email_marketing', label: 'Email-Marketing' },
        { value: 'ecommerce_management', label: 'E-commerce-Management' },
        { value: 'content_creation', label: 'Content-Creation' },
        { value: 'podcast_production', label: 'Podcast-Production' },
        { value: 'virtual_reality_development', label: 'Virtual-Reality-Development' },
        { value: 'augmented_reality_development', label: 'Augmented-Reality-Development' },
        { value: 'html_css_coding', label: 'HTML/CSS-Coding' },
        { value: 'javascript_programming', label: 'JavaScript-Programming' },
        { value: 'python_programming', label: 'Python-Programming' },
        { value: 'java_programming', label: 'Java-Programming' },
        { value: 'c_plus_plus_programming', label: 'C++-Programming' },
        { value: 'php_development', label: 'PHP-Development' },
        { value: 'ruby_on_rails', label: 'Ruby-on-Rails' },
        { value: 'api_development', label: 'API-Development' },
        { value: 'agile_methodologies', label: 'Agile-Methodologies' },
        { value: 'scrum_master', label: 'Scrum-Master' },
        { value: 'quality_assurance_testing', label: 'Quality-Assurance-Testing' },
        { value: 'data_visualization', label: 'Data-Visualization' },
        { value: 'tableau_expertise', label: 'Tableau-Expertise' },
        { value: 'salesforce_administration', label: 'Salesforce-Administration' },
        { value: 'it_project_coordination', label: 'IT-Project-Coordination' },
        { value: 'system_integration', label: 'System-Integration' },
        { value: 'penetration_testing', label: 'Penetration-Testing' },
        { value: 'ethical_hacking', label: 'Ethical-Hacking' },
        { value: 'devops_practices', label: 'DevOps-Practices' },
        { value: 'technical_writing', label: 'Technical-Writing' },
        { value: 'business_analysis', label: 'Business-Analysis' },
        { value: 'cloud_architecture', label: 'Cloud-Architecture' },
        { value: 'system_administration', label: 'System-Administration' },
        { value: 'windows_server_management', label: 'Windows-Server-Management' },
        { value: 'linux_administration', label: 'Linux-Administration' },
        { value: 'mobile_device_management', label: 'Mobile-Device-Management' },
        { value: 'iot_development', label: 'Internet-of-Things-(IoT)-Development' },
        { value: 'robotics_programming', label: 'Robotics-Programming' },
        { value: 'automation_scripting', label: 'Automation-Scripting' },
        { value: 'virtualization_technologies', label: 'Virtualization-Technologies' },
        { value: 'git_version_control', label: 'Git-Version-Control' },
        { value: 'troubleshooting_hardware_issues', label: 'Troubleshooting-Hardware-Issues' },
        { value: 'network_security_protocols', label: 'Network-Security-Protocols' },
        { value: 'data_recovery_techniques', label: 'Data-Recovery-Techniques' },
        { value: 'it_compliance_governance', label: 'IT-Compliance-and-Governance' },
        { value: 'digital_forensics', label: 'Digital-Forensics' },
        { value: 'user_experience_testing', label: 'User-Experience-Testing' },
        { value: 'remote_desktop_support', label: 'Remote-Desktop-Support' },
        { value: 'firewall_configuration', label: 'Firewall-Configuration' },
        { value: 'vpn_setup_management', label: 'VPN-Setup-and-Management' },
        { value: 'cms', label: 'Content-Management-Systems-(CMS)' },
        { value: 'wordpress_development', label: 'WordPress-Development' },
        { value: 'elearning_development', label: 'eLearning-Development' },
        { value: 'language_translation_software', label: 'Language-Translation-Software' },
        { value: 'graphic_animation', label: 'Graphic-Animation' },
        { value: 'social_media_advertising', label: 'Social-Media-Advertising' },
        { value: 'market_research_analysis', label: 'Market-Research-Analysis' },
        { value: 'ab_testing', label: 'A/B-Testing' },
        { value: 'digital_strategy_development', label: 'Digital-Strategy-Development' },
        { value: 'payment_gateway_integration', label: 'Payment-Gateway-Integration' },
        { value: 'ui_prototyping', label: 'User-Interface-Prototyping' },
        { value: 'responsive_web_design', label: 'Responsive-Web-Design' },
        { value: 'cross_browser_testing', label: 'Cross-Browser-Testing' },
        { value: 'cloud_storage_solutions', label: 'Cloud-Storage-Solutions' },
        { value: 'seo_auditing', label: 'SEO-Auditing' },
        { value: 'mobile_device_repair', label: 'Mobile-Device-Repair' },
        { value: 'html_email_design', label: 'HTML-Email-Design' },
        { value: 'online_course_creation', label: 'Online-Course-Creation' },
        { value: '3d_printing', label: '3D-Printing' },
        { value: 'basic_electrical_repair', label: 'Basic-Electrical-Repair' },
        { value: 'home_automation_systems', label: 'Home-Automation-Systems' },
        { value: 'climate_control_systems', label: 'Climate-Control-Systems' },
        { value: 'software_deployment', label: 'Software-Deployment' },
        { value: 'data_migration', label: 'Data-Migration' },
        { value: 'content_curation', label: 'Content-Curation' },
        { value: 'time_management_software', label: 'Time-Management-Software' },
        { value: 'collaboration_tools_management', label: 'Collaboration-Tools-Management' },
        { value: 'incident_management', label: 'Incident-Management' },
        { value: 'supply_chain_management_software', label: 'Supply-Chain-Management-Software' },
    ];


    const handleChange = (selected) => {
        const formSkills = selected ? selected.map(option => option) : [];
        const skills = selected ? selected.map(option => option.label) : [];
        setSelectedOptions(formSkills);
        handleForm('desiredSkills', skills);
        let temp = new Date();
        temp = formatDate(temp);
        handleForm('date', temp);
    };

    function formatDate(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        
        return `${month}/${day}/${year}`;
    }
    
    function handleSubmit(e){
        e.preventDefault();
        console.log(form)
        postFetch("posts", form).then(result => {
            if(result.success){
                router.push("/dashboard");
            }else{
                alert("Wrong Email or Password");
            }
        });
    }

    return (
    <>
            <Navbar></Navbar>
    
        <div className="createCont">
            <form onSubmit={handleSubmit} className="createForm">
                <div className="titleCont">
                    <h1>Create Post</h1>
                </div>
                <div className="infoCont">
                    <div className="info info1">
                        <div className="postInput">
                            <label htmlFor="title">Title</label>
                            <div>
                                <MdOutlineTitle className="icon"></MdOutlineTitle>
                                <input
                                    className="text-black" 
                                    type="title"
                                    autoComplete="true"
                                    name="title"
                                    id="title"
                                    placeholder="Web Development"
                                    value={form.title}
                                    required
                                    onChange={(e) => handleForm("title", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="postInput">
                            <label htmlFor="credit">Enter credit cost</label>
                            <div>
                                <FaRegCreditCard className="icon"></FaRegCreditCard>
                                <input
                                    className="text-black" 
                                    type="credit"
                                    autoComplete="true"
                                    name="credit"
                                    id="credit"
                                    placeholder="1"
                                    value={form.creditWorth}
                                    required
                                    onChange={(e) => handleForm("creditWorth", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="skillDrop">
                            <Select
                            id="foo_select"
                            name="foo_select"
                            options={options}
                            isMulti
                            placeholder="Select skills that apply"
                            value={selectedOptions}
                            onChange={handleChange}
                            className="dropdown text-black skills"
                            styles={{
                                container: (provided) => ({
                                ...provided,
                                width: 300,
                                }),
                            }}
                            />
                        </div>
                    </div>
                    <div className="info info2">
                        <label htmlFor="tet">Description of problem</label>
                        <textarea
                            className="text-black"
                            autoComplete="true"
                            name="text"
                            id="text"
                            placeholder="Enter problem"
                            value={form.text}
                            required
                            onChange={(e) => handleForm("text", e.target.value)}
                            rows="4"
                            style={{ resize: 'none' }}
                        />

                    </div>
                </div>
                <div className="subCont">
                    <button type="submit">Create Post</button>
                </div>
            </form>
        </div>
    </>

    )
}

export default CreatePost;