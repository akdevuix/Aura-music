import React from 'react';
import { Music, Github, ExternalLink, Heart, Code, Palette } from 'lucide-react';


export const Footer = () => {
  return (
    <footer className="relative mt-20 bg-black/40 backdrop-blur-xl border-t border-white/10">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          
          {/* Project Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-xl">
                <Music className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              style={{fontFamily: "'Disengaged', sans-serif"}}>
                AURAMUSIC
              </h3>
            </div>
            <p className="text-gray-400 text-2xl leading-relaxed"
            style={{fontFamily: "'SNOWMAS', sans-serif"}}>
              A modern music streaming application built with React, featuring search, playlists, and audio playback capabilities.
            </p>
            <br />
            <p className="text-gray-400 text-2xl leading-relaxed"
            style={{fontFamily: "'SNOWMAS', sans-serif"}}>
              This web app is fully developed by AK.Dev — all UI, logic, and functionality are custom-built.
              Special thanks to developer Sumit Kolhe for providing the public JioSaavn API used for data fetching.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-center space-x-2"
            style={{fontFamily: "'Noto Serif Display', sans-serif"}}>
              <Code className="h-5 w-5 text-purple-400" 
              />
              <span>Built With</span>
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {['React', 'Tailwind CSS', 'API'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-center md:justify-end space-x-2"
            style={{fontFamily: "'noto Serif Display', sans-serif"}}>
              <Palette className="h-5 w-5 text-pink-400" 
              />
              <span>Key Features</span>
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center justify-center md:justify-end space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Music Search & Discovery</span>
              </li>
              <li className="flex items-center justify-center md:justify-end space-x-2">
                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                <span>Custom Playlist</span>
              </li>
              <li className="flex items-center justify-center md:justify-end space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Audio Player Controls</span>
              </li>
              <li className="flex items-center justify-center md:justify-end space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Responsive Design</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

          <p className="text-gray-500 text-3xl text-center underline"
          style={{fontFamily:"'zarathos', 'sans-serif'"}}>
            Developed by Ak.Dev
          </p>

        {/* Copyright */}
        <div className="text-center mt-8 pt-6 border-t border-white/10">
          <p className="text-gray-500 text-lg">
             • • • • © 2025 AURAMUSIC • • • • 
          </p>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
    </footer>
  );
};