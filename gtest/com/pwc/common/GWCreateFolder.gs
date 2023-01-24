package com.pwc.common

uses org.apache.log4j.Logger

uses java.io.File

class GWCreateFolder {
  static final var _logger = Logger.getLogger(GWCreateFolder)

  /**
   *
   * @param filePath
   */
  static function createOneorMoreDirectories(filePath : String){
    _logger.trace("Entered GWFilesAndFolderUtil.createOneorMoreDirectories()")
    var file = new File(filePath)
    if(!file.exists()){
      if(file.mkdirs()){
        _logger.info("Folder(s) "+filePath+" has been created.")
      }
    }
    _logger.trace("Exiting GWFilesAndFolderUtil.createOneorMoreDirectories()")
  }
}