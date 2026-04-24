import { FaLinkedin, FaGithub, FaUser, FaStar } from "react-icons/fa"
import { SlLocationPin } from "react-icons/sl"
import { PiGraduationCap } from "react-icons/pi"
import { IoMdClose } from "react-icons/io";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const iconMap = {
    // Home
    linkedin: FaLinkedin,
    github: FaGithub,
    MapPin: SlLocationPin,

    // About
    user: FaUser,
    skills: FaStar,
    education: PiGraduationCap,
    
    // Project
    chevronLeft: FiChevronLeft,
    chevronRight: FiChevronRight,
    
    // Components
    close: IoMdClose,
}