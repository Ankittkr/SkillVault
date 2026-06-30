import React from "react";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";


export const Footer = () => {

return (

<footer className="
bg-[#f5f5f5]
text-gray-700
mt-20
border-t
border-gray-200
">


<div className="
max-w-7xl
mx-auto
px-6
py-16
grid
md:grid-cols-4
gap-12
">



{/* BRAND */}

<div className="md:col-span-2">


<h2 className="
text-3xl
font-bold
text-gray-900
">

Skill Vault

</h2>


<p className="
mt-4
max-w-md
text-gray-500
leading-relaxed
">

A modern Learning Management System
to learn skills, create projects and
build your future with expert courses.

</p>




<div className="
flex
gap-4
mt-7
">


{
[
FaInstagram,
FaGithub,
FaLinkedin,
FaTwitter
].map((Icon,index)=>(


<div
key={index}
className="
w-10
h-10
rounded-full
bg-white
border
border-gray-200
flex
items-center
justify-center
text-gray-700
shadow-sm
hover:bg-black
hover:text-white
transition
cursor-pointer
"
>

<Icon/>

</div>


))
}


</div>


</div>






{/* EXPLORE */}

<div>


<h3 className="
text-lg
font-semibold
text-gray-900
mb-5
">

Explore

</h3>



<ul className="
space-y-3
text-gray-500
">


<li className="hover:text-black cursor-pointer">
Courses
</li>


<li className="hover:text-black cursor-pointer">
Dashboard
</li>


<li className="hover:text-black cursor-pointer">
Become Instructor
</li>


<li className="hover:text-black cursor-pointer">
Pricing
</li>


</ul>


</div>








{/* SUPPORT */}

<div>


<h3 className="
text-lg
font-semibold
text-gray-900
mb-5
">

Support

</h3>



<ul className="
space-y-3
text-gray-500
">


<li className="hover:text-black cursor-pointer">
Contact Us
</li>


<li className="hover:text-black cursor-pointer">
Help Center
</li>


<li className="hover:text-black cursor-pointer">
Privacy Policy
</li>


<li className="hover:text-black cursor-pointer">
Terms
</li>


</ul>


</div>



</div>







{/* Bottom */}

<div className="
border-t
border-gray-200
">


<div className="
max-w-7xl
mx-auto
px-6
py-6
flex
justify-between
items-center
flex-col
md:flex-row
gap-3
text-sm
text-gray-500
">


<p>
© 2026 Skill Vault. All rights reserved.
</p>


<p>
Learning • Building • Growing 🚀
</p>


</div>


</div>



</footer>


)

}


