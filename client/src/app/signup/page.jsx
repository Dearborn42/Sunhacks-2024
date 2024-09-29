"use client";
import * as React from "react";
import { useState, useContext } from "react";
import { signup } from '@/Components/ServerFunctions';
import Select from 'react-select';
import {UserContext} from '../layout';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Image from 'next/image';
import img from '../../public/image.png';

export default function SignUpPage(){
    const {update} = useContext(UserContext);
    const router = useRouter();
    const [form, setForm] = useState({ email: "", name: "", userName: "", password: "", skills: [] });
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
        handleForm('skills', skills);
    };
    
    function handleSubmit(e){
        e.preventDefault();
        console.log(form);
        update({...form})
        signup(form).then(result => {
            if(result.success){
                update(result.user);
                router.push("/dashboard");
            }else{
                alert("Wrong Email or Password");
            }
        });
    }


    return (
        <div className="signCont">
            <form onSubmit={handleSubmit} className="signForm">
                <div className="imgCont">
                    <Image
                    src={img}
                    width={500}
                    height={500}
                    alt="signup"
                    />
                </div>
                <div className="signInfo">
                    <h1 className="title">Sign Up</h1>
                    <div className="inputCont">
                        <label htmlFor="email">Email</label>
                        <div>
                            <MdOutlineMail className="icon"/>
                            <input
                                className="text-black" 
                                type="email"
                                autoComplete="true"
                                name="email"
                                id="email"
                                placeholder="example@gmail.com"
                                value={form.email}
                                required
                                onChange={(e) => handleForm("email", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="inputCont">
                        <label htmlFor="name">Name</label>
                        <div>
                            <IoPersonOutline className="icon"></IoPersonOutline>
                            <input
                                className="text-black" 
                                type="name"
                                autoComplete="true"
                                name="name"
                                id="name"
                                placeholder="John Doe"
                                value={form.name}
                                required
                                onChange={(e) => handleForm("name", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="inputCont">
                        <label htmlFor="username">Username</label>
                        <div>
                            <CgProfile className="icon"></CgProfile>
                            <input
                                className="text-black" 
                                type="usernme"
                                autoComplete="true"
                                name="usernme"
                                id="usernme"
                                placeholder="Pibble"
                                value={form.userName}
                                required
                                onChange={(e) => handleForm("userName", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="inputCont">
                        <label htmlFor="password">Password</label>
                        <div>
                            <RiLockPasswordLine className="icon"/>
                            <input
                                className="text-black"
                                type="password"
                                autoComplete="true"
                                name="password"
                                id="password"
                                placeholder="******"
                                value={form.password}
                                required
                                onChange={(e) => handleForm("password", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="skillCont">
                        <Select
                        id="foo_select"
                        name="foo_select"
                        options={options}
                        isMulti
                        placeholder="Select your skills"
                        value={selectedOptions}
                        onChange={handleChange}
                        className="dropdown text-black skillDrop"
                        styles={{
                            container: (provided) => ({
                            ...provided,
                            width: 300,
                            }),
                        }}
                        />
                    </div>
                    <p>Have an account already? <Link href="../login" className="login">Login</Link></p>
                    <button type="submit">Signup</button>
                </div>
            </form>
        </div>
    )
}